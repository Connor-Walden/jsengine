class ExampleLayer extends Layer {
    constructor(game, name) {
        super(name);

        this.renderer = game.renderer;
    }

    OnAttach() {
        const ents = [
            background_entity_example(this.renderer)
        ]

        ents.forEach(ent => {
            this.AddEntity(ent);
        });
        super.OnAttach();
    }
}

const background_entity_example = renderer => {
    const example_entity = new Entity(0, 'background');

    const example_transform = new Transform(
        example_entity, {
            x: 0,
            y: 0
        },
        0,
        1
    );

    const example_sprite_renderer = new SpriteRenderer(
        example_entity,
        renderer,
        'img/background.jpg', {
            x: 0,
            y: 0,
            w: renderer.canvas.width,
            h: renderer.canvas.height
        }
    );

    const example_script = new Script(
        example_entity, {
            OnAttach: () => {

            },
            OnUpdate: () => {

            }
        }
    );

    example_entity.AddComponent(example_transform);
    example_entity.AddComponent(example_sprite_renderer);
    example_entity.AddComponent(example_script);

    return example_entity;
};