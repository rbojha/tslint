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
                            // console.log("child-0 ", node.getChildAt(0).getText());
                            // console.log("child-1 ", node.getChildAt(1).getText());
                            // console.log("child-2 ", node.getChildAt(2).getText());
                            // console.log("child-3 ", node.getChildAt(3).getText());
                            // console.log("child-4 ", node.getChildAt(4).getText());
                            // console.log("child-5 ", node.getChildAt(5).getText());
                            // console.log("child ", node.getChildren().indexOf(node.getChildAt(1)));
                            // let s = node.getChildAt(0).getText().length + 1
                            // this.addFailure(this.createFailure(node.getChildAt(0).getText().length + 1,
                            //     node.getEnd(), Rule.FAILURE_STRING));
                        }
                    }
                });
            });
        }
    }
}
