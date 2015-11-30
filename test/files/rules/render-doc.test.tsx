import * as banana from "react-addons-test-utils";
import * as apple from "react-addons-test-utils";
import {renderIntoDocument, ojha, ComponentUtil} from "react-addons-test-utils";
// import {renderIntoDocument} from "one-import";
import * as orange from "some-import";
import * as P from "./lang";
import * as abc from "xyz";
import * as def from "uvw"

class BaseComponent extends React.Component {
    // Should not fail
}

class ClassOne extends BaseComponent {
    // Should Fail
}

class ClassTwo extends BaseComponent {
    // Should not Fail
}

class ClassThree extends BaseComponent {
    // Should Fail
}

class ClassFour extends BaseComponent {
    // Should not Fail
}

describe("Language", () => {
    it("should validate undefined", () => {
        let a: string;
        expect(P.isUndefined(a)).toBe(true);
        renderIntoDocument(<Panel3></Panel3>);
        banana.renderIntoDocument(<Panel3></Panel3>);
        apple.renderIntoDocument(<Panel3></Panel3>);
        abc.renderIntoDocument(<Panel3></Panel3>);
        expect(() => renderIntoDocument(<Panel3></Panel3>)).not.toThrow();
    });
});
