class Script extends Component {
    constructor(entity, script) {
        super(entity, "Script");

        this.script = script;
    }

    OnAttach() {
        this.script.OnAttach(this.entity);
    }

    OnUpdate() {
        this.script.OnUpdate(this.entity);
    }
}