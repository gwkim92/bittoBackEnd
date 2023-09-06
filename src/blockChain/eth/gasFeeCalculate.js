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
  let lowerBound = q1 - 1.5 * iqr;
  let upperBound = q3 + 1.5 * iqr;

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

    // Perform clustering with fixed number of clusters (3)
    let optimalMaxValuesClusters = clusterData(filteredMaxFees, 3);
    let optimalPriorityValuesClusters = clusterData(filteredPriorityFees, 3);

    let minMaxValue = Math.min(...optimalMaxValuesClusters);
    minMaxValue = minMaxValue < 1 ? "3" : minMaxValue.toFixed(2);

    let medianMaxValue = stats.median(optimalMaxValuesClusters);
    medianMaxValue = medianMaxValue < 1 ? "3" : medianMaxValue.toFixed(2);

    let maxMavalue = Math.max(...optimalMaxValuesClusters);
    maxMavalue = maxMavalue < 1 ? "3" : maxMavalue.toFixed(2);

    // Repeat similar calculations for priority fees.
    let minPriorityValue = Math.min(...optimalPriorityValuesClusters);
    minPriorityValue =
      minPriorityValue < 1.5 ? "1.5" : minPriorityValue.toFixed(2);

    let medianPriorityValue = stats.median(optimalPriorityValuesClusters);
    medianPriorityValue =
      medianPriorityValue < 1.5 ? "1.5" : medianPriorityValue.toFixed(2);

    let maxPrioityvalue = Math.max(...optimalPriorityValuesClusters);
    maxPrioityvalue =
      maxPrioityvalue < 1.5 ? "1.5" : maxPrioityvalue.toFixed(2);

    console.log("Min Max Value:", minMaxValue);
    console.log("Median Max Value:", medianMaxValue);
    console.log("Maximum Max Value:", maxMavalue);

    console.log("min prioity value:", minPriorityValue);
    console.log("median prioity value:", medianPriorityValue);
    console.log("maximum prioity value:", maxPrioityvalue);

    console.log(
      web3.utils.toWei(minMaxValue.toString(), "gwei"),
      web3.utils.toWei(medianMaxValue.toString(), "gwei"),
      web3.utils.toWei(maxMavalue.toString(), "gwei"),

      web3.utils.toWei(minPriorityValue.toString(), "gwei"),
      web3.utils.toWei(medianPriorityValue.toString(), "gwei"),
      web3.utils.toWei(maxPrioityvalue.toString(), "gwei")
    );
    return {
      minFeePerGas: web3.utils.toWei(minMaxValue.toString(), "gwei"),
      medianFeePerGas: web3.utils.toWei(medianMaxValue.toString(), "gwei"),
      maxFeePerGas: web3.utils.toWei(maxMavalue.toString(), "gwei"),
      minPriorityFee: web3.utils.toWei(minPriorityValue.toString(), "gwei"),
      medianPriorityFee: web3.utils.toWei(
        medianPriorityValue.toString(),
        "gwei"
      ),
      maxPriorityFee: web3.utils.toWei(maxPrioityvalue.toString(), "gwei"),
    };
  } catch (error) {
    console.error(`failed to calculate fees: ${error}`);
  }
}

async function useCalculatedFees() {
  const fees = await calculateFees();
  console.log(fees.minFeePerGas); // Wei 단위의 최소 가스 가격 출력.
  console.log(fees.medianFeePerGas); // Wei 단위의 중간 가스 가격 출력.
  console.log(fees.maxFeePerGas); // Wei 단위의 최대 가스 가격 출력.
  console.log(fees.minPriorityFee); // Wei 단위의 최소 우선 순위 수수료 출력.
  console.log(fees.medianPriorityFee); // Wei 단위의 중간 우선 순위 수수료 출력.
  console.log(fees.maxPriorityFee);
}
useCalculatedFees();

module.exports = {
  calculateFees,
};
