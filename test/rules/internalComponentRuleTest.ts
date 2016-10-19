import * as Lint from "../lint";

describe("<internal-component>", () => {
    const internalComponentRule = Lint.Test.getRule("internal-component");
    const fileName = "rules/internalComponent.test.ts";
    // const validFileName = "rules/internalComponent.spec.test.ts";

    it("internal component Rule", () => {
        let createFailure = Lint.Test.createFailuresOnFile(fileName, internalComponentRule.FAILURE_STRING);
        let expectedFailures = [
            createFailure([1, 23], [1, 35])
        ];
        let actualFailures = Lint.Test.applyRuleOnFile(fileName, internalComponentRule);

        Lint.Test.assertFailuresEqual(actualFailures, expectedFailures);

        // createFailure = Lint.Test.createFailuresOnFile(validFileName, internalComponentRule.FAILURE_STRING);
        // expectedFailures = [];
        // actualFailures = Lint.Test.applyRuleOnFile(validFileName, internalComponentRule);

        // Lint.Test.assertFailuresEqual(actualFailures, expectedFailures);
    });
});
