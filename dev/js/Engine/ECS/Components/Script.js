class Script extends Component {
    constructor(entity, script) {
        super(entity);
        this.script = script;
    }

    OnAttach() {
        this.script.OnAttach(this.entity);
    }

    OnUpdate() {
        this.script.OnUpdate(this.entity);
    }
}