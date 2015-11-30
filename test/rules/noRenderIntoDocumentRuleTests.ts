import * as Lint from "../lint";
describe("<no-render-into-document>", () => {
    const ClassNameExtendRule = Lint.Test.getRule("no-render-into-document");
    const fileName = "rules/render-doc.test.tsx";

    it("ensures class should not use RenderIntoDocumentRule", () => {
        const createFailure = Lint.Test.createFailuresOnFile(fileName, ClassNameExtendRule.FAILURE_STRING);
        const expectedFailures = [
            createFailure([30, 9], [30, 27]),
            createFailure([31, 9], [31, 34]),
            createFailure([32, 9], [32, 33]),
            createFailure([33, 22], [33, 40])
        ];
        const actualFailures = Lint.Test.applyRuleOnFile(fileName, ClassNameExtendRule);

        Lint.Test.assertFailuresEqual(actualFailures, expectedFailures);
    });
});
