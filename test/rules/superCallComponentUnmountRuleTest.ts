// import * as Lint from "../lint";
// 
// describe("<super-call-component-unmount>", () => {
//     const superRule = Lint.Test.getRule("super-call-component-unmount");
//     const fileName = "rules/superCallComponentUnmount.test.ts";
// 
//     it("super call by componentUnmount", () => {
//         const createFailure = Lint.Test.createFailuresOnFile(fileName, superRule.FAILURE_STRING);
//         const expectedFailures = [
//             createFailure([6, 5], [6, 25]),
//             createFailure([40, 5], [40, 25]),
//             createFailure([47, 9], [47, 29]),
//             createFailure([54, 2], [54, 22]),
//             createFailure([81, 2], [81, 22]),
//             createFailure([72, 2], [72, 22])
//         ];
//         const actualFailures = Lint.Test.applyRuleOnFile(fileName, superRule);
// 
//         Lint.Test.assertFailuresEqual(actualFailures, expectedFailures);
//     });
// });
