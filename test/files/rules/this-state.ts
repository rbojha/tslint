class BaseComponent {
    // Should not Fail
}

class ClassOne extends BaseComponent {
    public componentDidMount(): void {
        this.state = {};
        let a = [1, 2];
        a.map((x) => {
            x = x + 1;
        });
    }
    // Should Fail
}

class ClassTwo extends BaseComponent {
    public componentDidMount(): void {
        // Should not Fail
    }
}

class ClassThree extends BaseComponent {
    public componentDidMount(): void {
        let a = [1, 2];
        a.map((x) => {
            x = x + 1;
        });
        this.state = {};
    }
    // Should Fail
}

class ClassFour extends BaseComponent {
    constructor() {
        this.state = {};
    }
    // Should not Fail
}
