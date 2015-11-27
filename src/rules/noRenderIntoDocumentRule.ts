import * as ts from "typescript";
import * as Lint from "../lint";


const REACT_UTILS = "react-addons-test-utils";
const RENDER_INTO_DOCUMENT = "renderIntoDocument";
// const IT = "it";
const MODULE_SPECIFIER_MATCH = /^["'](.+)['"]$/;
export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = "should not use RenderIntoDocumentRule";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(<Lint.RuleWalker>(new RenderIntoDocumentWalker(sourceFile, this.getOptions())));
    }
}

class RenderIntoDocumentWalker extends Lint.RuleWalker {
    private isReactUtilImported: boolean;
    private isFunctionImported: boolean;
    private localModuleName: string;

    public visitImportDeclaration(node: ts.ImportDeclaration): void {
        // console.log("i am here Import");
        this.isReactUtilImported = false;
        this.isFunctionImported = false;

        const moduleSpecifier = node.moduleSpecifier.getText();
        const moduleNameMatch = moduleSpecifier.match(MODULE_SPECIFIER_MATCH);
        if (REACT_UTILS.indexOf(moduleNameMatch[1]) >= 0) {
            this.isReactUtilImported = true;
        }

        super.visitImportDeclaration(node);
    }

    public visitNamedImports(node: ts.NamedImports): void {
        // console.log("I am here NamedImports");
        if (this.isReactUtilImported) {
            node.elements.forEach((element) => {
                if (element.name.getText() === RENDER_INTO_DOCUMENT) {
                    this.isFunctionImported = true;
                }
            });
        }

        super.visitNamedImports(node);
    }

    public visitNamespaceImport(node: ts.NamespaceImport): void {
        // console.log("I am here NamespaceImport");
        if (this.isReactUtilImported) {
            this.localModuleName = node.name.getText();
        }

        super.visitNamespaceImport(node);
    }

    public visitArrowFunction(node: ts.FunctionLikeDeclaration): void {
        // const parent = node.parent;
        const body = node.body;
        console.log("Body", body.statements);
        // if (body != null && body.kind === ts.SyntaxKind.Block) {
        //     // console.log("StateMents", body.statements);
        // }
        // if (parent.expression === IT) {
        //     body.statements.forEach((statement) => {
        //         console.log(statement);
        //     })
        // }
        super.visitArrowFunction(node);
    }
}
