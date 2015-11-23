import * as ts from "typescript";
import * as Lint from "../lint";

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = "class must not extend from React.Component directly";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(<Lint.RuleWalker>(new NoReactComponentExtendWalker(sourceFile, this.getOptions())));
    }
}

class NoReactComponentExtendWalker extends Lint.RuleWalker {
    public visitClassDeclaration(node: ts.ClassDeclaration): void {
        if (node.heritageClauses) {
            node.heritageClauses.forEach((heritageClauses) => {
                heritageClauses.types.forEach((type) => {
                    if (type.expression.getText() === "React.Component") {
                        if (node.name !== undefined) {
                            this.addFailure(this.createFailure(node.name.getStart(), node.name.getWidth(), Rule.FAILURE_STRING));
                        } else {
                            this.addFailure(this.createFailure(node.getStart(), node.getEnd(), Rule.FAILURE_STRING));
                        }
                    }
                });
            });
        }
    }
}
