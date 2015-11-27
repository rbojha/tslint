import * as Lint from "../lint";
describe("<no-render-into-document>", () => {
    const ClassNameExtendRule = Lint.Test.getRule("no-render-into-document");
    const fileName = "rules/render-doc.test.tsx";

    it("ensures class should not use RenderIntoDocumentRule", () => {
        const createFailure = Lint.Test.createFailuresOnFile(fileName, ClassNameExtendRule.FAILURE_STRING);
        const expectedFailures = [
            createFailure([5, 7], [5, 22]),
            createFailure([9, 14], [9, 33])
        ];
        const actualFailures = Lint.Test.applyRuleOnFile(fileName, ClassNameExtendRule);

        Lint.Test.assertFailuresEqual(actualFailures, expectedFailures);
    });
});
