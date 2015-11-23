import * as Lint from "../lint";
describe("<class-extend>", () => {
    const ClassNameExtendRule = Lint.Test.getRule("no-class-extend-react-component");
    const fileName = "rules/class-extend.tsx";

    it("ensures class not to extend from React.Component directly", () => {
        const createFailure = Lint.Test.createFailuresOnFile(fileName, ClassNameExtendRule.FAILURE_STRING);
        const expectedFailures = [
            createFailure([5, 7], [5, 22]),
            createFailure([9, 14], [9, 33])
        ];
        const actualFailures = Lint.Test.applyRuleOnFile(fileName, ClassNameExtendRule);

        Lint.Test.assertFailuresEqual(actualFailures, expectedFailures);
    });
});
