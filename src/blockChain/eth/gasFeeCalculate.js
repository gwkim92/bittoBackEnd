const { web3 } = require("../connection");
const BigNumber = require("bignumber.js");
const stats = require("simple-statistics");
const { kmeans } = require("ml-kmeans");

async function getPendingTransactions() {
  try {
    const pendingBlock = await web3.eth.getBlock("pending", true);

    const pendingTransactions = pendingBlock.transactions.filter(
      (tx) =>
        tx.maxFeePerGas !== null &&
        tx.maxPriorityFeePerGas !== null &&
        typeof tx.maxFeePerGas !== "undefined" &&
        typeof tx.maxPriorityFeePerGas !== "undefined"
    );

    return pendingTransactions;
  } catch (error) {
    console.error(`Failed to fetch pending transactions: ${error}`);
  }
}

function removeOutliers(data) {
  // Calculate Q1 and Q3
  let q1 = stats.quantile(data, 0.25);
  let q3 = stats.quantile(data, 0.75);

  // Calculate Interquartile Range (IQR)
  let iqr = q3 - q1;

  // Define lower bound and upper bound for outliers
  let lowerBound = q1 - iqr * 0.5; // change from 'q1 - (iqr * 1.5)' to 'q1 - (iqr * .5)'
  let upperBound = q3 + iqr * 0.5; // change from 'q3 + (iqr * .5)' to 'q3 + (iqr * .5)'

  // Filter out values that are below the lower bound or above the upper bound
  return data.filter((x) => x >= lowerBound && x <= upperBound);
}

function clusterData(data) {
  // Reshape data for k-means clustering
  let reshapedData = data.map((value) => [value]);

  // Perform k-means clustering
  let clustersResult = kmeans(reshapedData, Math.min(reshapedData.length, 5), {
    initialization: "kmeans++",
  });

  console.log(clustersResult); // Add this line

  return clustersResult.centroids.map((centroid) => centroid[0]);
}

function calculateFeeValues(clusteredFees) {
  let minFee = Math.min(...clusteredFees).toFixed(9);
  let medianValue = stats.median(clusteredFees).toFixed(9);
  let maxValue = Math.max(...clusteredFees).toFixed(9);

  console.log("test : ", minFee, medianValue, maxValue);

  return {
    min: web3.utils.toWei(minFee, "gwei"),
    median: web3.utils.toWei(medianValue, "gwei"),
    max: web3.utils.toWei(maxValue, "gwei"),
  };
}

async function calculateFees() {
  try {
    const transactions = await getPendingTransactions();

    let maxFees = [];
    let priorityFees = [];

    for (let i = 0; i < transactions.length; i++) {
      const txMaxFeeBigNumber = new BigNumber(transactions[i].maxFeePerGas);
      const txPriorityFeeBigNumber = new BigNumber(
        transactions[i].maxPriorityFeePerGas
      );

      maxFees.push(txMaxFeeBigNumber.dividedBy(1e9).toNumber());
      priorityFees.push(txPriorityFeeBigNumber.dividedBy(1e9).toNumber());
    }

    let filteredMaxFees = removeOutliers(maxFees);
    let filteredPriorityFees = removeOutliers(priorityFees);

    var optimalMaxValuesClusters = clusterData(filteredMaxFees, 3);

    var optimalPriorityValuesClusters = clusterData(
      filteredPriorityFees.filter(
        (fee) => fee <= Math.min(...optimalMaxValuesClusters)
      ),
      3
    );

    const priorityValues = calculateFeeValues(optimalPriorityValuesClusters);
    const feePerGasValues = calculateFeeValues(optimalMaxValuesClusters);

    console.log("min prioity value:", priorityValues.min);
    console.log("median prioity value:", priorityValues.median);
    console.log("maximum prioity value:", priorityValues.max);
    console.log("Min Max Value:", feePerGasValues.min);
    console.log("Median Max Value:", feePerGasValues.median);
    console.log("Maximum Max Value:", feePerGasValues.max);
    return {
      minPriorityFeePerGas: priorityValues.min,
      medianPriorityFeePerGas: priorityValues.median,
      maxPriorityFeePerGas: priorityValues.max,
      minFeePerGas: feePerGasValues.min,
      medianFeePerGas: feePerGasValues.median,
      maxFeePerGas: feePerGasValues.max,
    };
  } catch (error) {
    throw new Error(`Failed to calculate fees: ${error}`);
  }
}

module.exports = {
  calculateFees,
};
