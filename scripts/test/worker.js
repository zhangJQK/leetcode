import { workerData as testGroup } from "worker_threads";
import { constants } from "fs";
import { access } from "fs/promises";

testGroup.forEach(async (testName) => {
  const testPath = `test/${testName}/test.js`;
  let testAccessError = false;
  try {
    testAccessError = await access(testPath, constants.F_OK);
  } catch (error) {
    testAccessError = error;
  }
  if (!testAccessError) {
    import(`../../${testPath}`);
  }
});
