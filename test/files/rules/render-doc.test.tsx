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
        expect(P.isUndefined(undefined)).toBe(true);
        expect(P.isUndefined(a)).toBe(true);
        expect(P.isUndefined(10)).toBe(false);
        expect(P.isUndefined({})).toBe(false);
        expect(() => ComponentUtil.renderComponent(<Panel3></Panel3>)).not.toThrow();
    });
});
