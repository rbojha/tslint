import * as ts from "typescript";
import * as Lint from "../lint";

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = "this.state should not assigned other that constructor";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new MethodWalker(sourceFile, this.getOptions()));
    }
}

class MethodWalker extends Lint.RuleWalker {
    public visitMethodDeclaration(node: ts.MethodDeclaration): void {
        if (node.body.statements !== undefined && node.body.statements.length > 0) {
            node.body.statements.forEach((statement) => {
                if (statement.getText().indexOf("this.state =") >= 0) {
                    this.addFailure(this.createFailure(node.name.getStart(), node.name.getWidth(), Rule.FAILURE_STRING));
                }
            });
        }
    }
}
