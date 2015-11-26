import * as Lint from "../lint";
describe("<constructor-paramater>", () => {
    const ClassNameExtendRule = Lint.Test.getRule("no-constructor-parameter");
    const fileName = "rules/constructor-param.tsx";

    it("constructor cannot contain 'props' or 'context' as parameter", () => {
        const createFailure = Lint.Test.createFailuresOnFile(fileName, ClassNameExtendRule.FAILURE_STRING);
        const expectedFailures = [
            createFailure([24, 17], [24, 22])
        ];
        const actualFailures = Lint.Test.applyRuleOnFile(fileName, ClassNameExtendRule);

        Lint.Test.assertFailuresEqual(actualFailures, expectedFailures);
    });
});
