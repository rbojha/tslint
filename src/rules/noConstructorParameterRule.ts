import * as ts from "typescript";
import * as Lint from "../lint";

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = "constructor cannot contain 'props' or 'context' as parameter";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(<Lint.RuleWalker>(new NoConstructorParameterWalker(sourceFile, this.getOptions())));
    }
}

class NoConstructorParameterWalker extends Lint.RuleWalker {
    private extendsBaseComponent: boolean;

    public visitClassDeclaration(node: ts.ClassDeclaration): void {
        this.extendsBaseComponent = false;
        if (node.heritageClauses) {
            node.heritageClauses.forEach((heritageClauses) => {
                heritageClauses.types.forEach((type) => {
                    if (type.expression.getText() === "BaseComponent") {
                        this.extendsBaseComponent = true;
                    }
                });
            });
        }
        super.visitClassDeclaration(node);
    }

    public visitConstructorDeclaration(node: ts.ConstructorDeclaration): void {
        if (this.extendsBaseComponent) {
            const parameters = node.parameters;
            console.log("Logging 2 ", parameters.length);
            if (parameters.length > 0) {
                this.addFailure(this.createFailure(parameters[0].name.getStart(), parameters[0].name.getWidth(), Rule.FAILURE_STRING));
            }
        }
        super.visitConstructorDeclaration(node);
    }
}
