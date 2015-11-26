import * as Lint from "../lint";

describe("<ensure-this-state-in-constructor>", () => {
    const ClassNameRule = Lint.Test.getRule("ensure-this-state-in-constructor");
    const fileName = "rules/this-state.ts";

    it("ensures class names are always pascal-cased", () => {
        const createFailure = Lint.Test.createFailuresOnFile(fileName, ClassNameRule.FAILURE_STRING);
        const expectedFailures = [
            createFailure([6, 12], [6, 29]),
            createFailure([23, 12], [23, 29])
        ];
        const actualFailures = Lint.Test.applyRuleOnFile(fileName, ClassNameRule);

        Lint.Test.assertFailuresEqual(actualFailures, expectedFailures);
    });
});
