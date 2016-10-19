import * as ts from "typescript";
import * as Lint from "../lint";

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = "this NamedImport Component is only for the testing";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new ImportDeclarationWalker(sourceFile, this.getOptions()));
    }
}

// interface AST {
//     packageName: string;
//     internalComp: string[];
// }

class ImportDeclarationWalker extends Lint.RuleWalker {
    // private ast: AST[];
    public visitNamedImports(node: ts.NamedImports) {
        let sourceFile = this.getSourceFile().fileName.split("/").reverse()[0];
        console.log("Ojha", sourceFile, node);
        for (const namedImport of node.elements) {
            if (!(sourceFile.indexOf(".spec.") > 0) && namedImport.name.text.indexOf("Internal") === 0) {
                this.addFailure(this.createFailure(namedImport.name.getStart(), namedImport.name.getWidth(), Rule.FAILURE_STRING));
            }
        }
        super.visitNamedImports(node);
    }

    // public visitSourceFile(node: ts.SourceFile) {
    //     super.visitSourceFile(node);
    //     Lint.scanAllTokens(ts.createScanner(ts.ScriptTarget.ES5, false, ts.LanguageVariant.Standard, node.text),
    //  (scanner: ts.Scanner) => {
    //         const startPos = scanner.getStartPos();
    //         for (let lineStart of node.getLineStarts()) {
    //             scanner.setTextPos(lineStart);
    //             console.log("I am here");
    //             if (scanner.getToken() === ts.SyntaxKind.SingleLineCommentTrivia) {
    //                 console.log("Ojha:", scanner.getTokenText(), startPos);
    //             }
    //         }
    //         // if (scanner.getToken() === ts.SyntaxKind.SingleLineCommentTrivia) {
    //         //     scanner.getEn
    //         //     console.log("Ojha:", scanner.getTokenText(), startPos);
    //         //     let lc = ts.getLineAndCharacterOfPosition(node, startPos + 1);
    //         //     console.log(lc);
    //         // }
    //     });
    // }

    // public visitExportAssignment(node: ts.ExportAssignment) {
    //     console.log("Ojha:", node);
    // }
}
