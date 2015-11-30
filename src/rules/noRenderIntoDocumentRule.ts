import * as ts from "typescript";
import * as Lint from "../lint";


const REACT_UTILS = "react-addons-test-utils";
const RENDER_INTO_DOCUMENT = "renderIntoDocument";
const MODULE_SPECIFIER_MATCH = /^["'](.+)['"]$/;
export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = "should not use RenderIntoDocument";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(<Lint.RuleWalker>(new RenderIntoDocumentWalker(sourceFile, this.getOptions())));
    }
}

class RenderIntoDocumentWalker extends Lint.RuleWalker {
    private isFunctionImported = false;
    private isNamespaceImported = false;
    private localModuleNames: Array<string>;

    public visitNamedImports(node: ts.NamedImports): void {
        const importDeclaration = <ts.ImportDeclaration> node.parent.parent;
        const moduleSpecifier = importDeclaration.moduleSpecifier.getText();
        const moduleNameMatch = moduleSpecifier.match(MODULE_SPECIFIER_MATCH);
        if (REACT_UTILS === moduleNameMatch[1]) {
            node.elements.forEach((element) => {
                if (element.name.getText() === RENDER_INTO_DOCUMENT) {
                    this.isFunctionImported = true;
                }
            });
        }

        super.visitNamedImports(node);
    }

    public visitNamespaceImport(node: ts.NamespaceImport): void {
        const importDeclaration = <ts.ImportDeclaration> node.parent.parent;
        const moduleSpecifier = importDeclaration.moduleSpecifier.getText();
        const moduleNameMatch = moduleSpecifier.match(MODULE_SPECIFIER_MATCH);
        this.localModuleNames = this.localModuleNames || [];
        if (REACT_UTILS === moduleNameMatch[1]) {
            this.isNamespaceImported = true;
            this.localModuleNames.push(node.name.getText());
        }

        super.visitNamespaceImport(node);
    }

    public visitCallExpression(node: ts.CallExpression): void {
        const expression = node.expression;
        const expressionText = expression.getText();
        if (expressionText === RENDER_INTO_DOCUMENT) {
            if (this.isFunctionImported) {
                this.addFailure(this.createFailure(node.getStart(), node.getEnd(), Rule.FAILURE_STRING));
            }
        }

        if (expressionText.indexOf(RENDER_INTO_DOCUMENT) > 0) {
            if (this.isNamespaceImported) {
                this.localModuleNames.forEach((localName) => {
                    const localExpression = localName + "." + RENDER_INTO_DOCUMENT;
                    if (expression.getText() === localExpression) {
                        this.addFailure(this.createFailure(node.getStart(), node.getEnd(), Rule.FAILURE_STRING));
                    }
                });
            }
        }

        super.visitCallExpression(node);
    }
}
