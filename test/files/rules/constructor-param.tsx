class BaseComponent {
    // Should not fail
}

class ReactCompClassOne extends React.Component<{}, {}> {
    constructor() {
        // should not fail
    }
}

class ReactCompClassTwo extends React.Component<{}, {}> {
    constructor(props? {}) {
        // should not fail
    }
}

class BaseCompOne extends BaseComponent {
    constructor() {
        // should not fail
    }
}

class BaseCompTwo extends BaseComponent {
    constructor(props? {}) {
        // should fail
    }
}
