class BaseComponent {
    // Should not fail
}

class OneAnotherClass extends React.Component<{}, {}> {
    // Should Fail
}

export class OneMoreAnotherClass extends React.Component<{}, {}> {
    // Should Fail
}

class AnotherClass extends BaseComponent {
    // Should not fail
}

export class OneMoreClass extends BaseComponent {
    // Should not Fail
}

export default class {
    // should not fail
}
