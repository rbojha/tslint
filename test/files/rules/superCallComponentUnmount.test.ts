class BaseComponent {
	// Should not fail
}

class BaseCompSeven extends BaseComponent { // - 4 - 212
	componentWillUnmount() {
		// Should Fail
	}
}

class BaseCompSeven {
	componentWillUnmount() {
		// Should not fail Fail
	}
}

class BaseCompOne extends BaseComponent { // - 3 - 212
	
}

class BaseCompThree extends BaseComponent { // - 4 - 212
	componentWillUnmount() {
		super.componentWillUnmount();
	}
}

function myfunct() {
	return class BaseCompFour {};
}

function myfunct2() {
	return class BaseCompFive {
		componentWillUnmount() {
			// Should not Fail
		}
	};
}

class BaseCompTwo extends BaseComponent { // - 1 - 212
	componentWillUnmount() {
		// Should Fail
	}
}

function myfunct3() {
	return class BaseCompSix extends BaseComponent { // - 2 - 184
		componentWillUnmount() {
			// Should fail
		}
	};
}

class Component1 extends BaseComponent {
	componentWillUnmount(): void {
		someStatement();
		// Should Fail
	}
}

class Component2 extends BaseComponent { }

class Component3 { }

class Component4 extends BaseComponent {
	componentWillUnmount(): void {
		super.componentWillUnmount();
		someStatement();
	}
}

class Component5 extends BaseComponent {
	componentWillUnmount(): void {
		if (test) {
			dosomething();
		}
		super.componentWillUnmount();
		// need to ask
	}
}

class Component6 extends BaseComponent {
	componentWillUnmount(): void {
		// Testing empty componentWillUnmount
		// Should fail
	}
}
