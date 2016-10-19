import * as ts from "typescript";
import * as Lint from "../lint";

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = "name must be in pascal case";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new ClassDefinationWalker(sourceFile, this.getOptions()));
    }
}

class ClassDefinationWalker extends Lint.RuleWalker {
    private extendsBaseComponent: boolean;
    public visitNode(node: ts.Node): void {
        if (node.kind === ts.SyntaxKind.ClassExpression || node.kind === ts.SyntaxKind.ClassDeclaration) {
            this.extendsBaseComponent = false;
            if ((<ts.ClassDeclaration> node).heritageClauses) {
                (<ts.ClassDeclaration> node).heritageClauses.forEach((heritageClause) => {
                    heritageClause.types.forEach((type) => {
                        if (type.expression.getText() === "BaseComponent") {
                            this.extendsBaseComponent = true;
                        }
                    });
                });
            }
        }
        super.visitNode(node);
    }

    public visitMethodDeclaration(node: ts.MethodDeclaration): void {
        if (this.extendsBaseComponent) {
            if (node.name.getText() === "componentWillUnmount"
            && (node.body.statements.length === 0 || node.body.statements[0].getText() !== "super.componentWillUnmount();")) {
                console.log("Methode Declaration", node.parent.getText());
                this.addFailure(this.createFailure(node.name.getStart(), node.name.getWidth(), Rule.FAILURE_STRING));
            }
        }
        super.visitMethodDeclaration(node);
    }
}
