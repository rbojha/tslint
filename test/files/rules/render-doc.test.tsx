import * as TestUtils from "react-addons-test-utils";
import {renderIntoDocument, ojha, ComponentUtil} from "react-addons-test-utils";
import * as P from "./lang";

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
        TestUtils.renderIntoDocument(<Panel3></Panel3>);
        expect(() => renderIntoDocument(<Panel3></Panel3>)).not.toThrow();
    });
});
