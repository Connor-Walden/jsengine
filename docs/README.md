## LanternWeb
    - Description
        - Javascript game engine for 2d games.
    - Latest Release: 
        - Version 1.0
    - Documentation
        - Please use the sidebar to view documentation for how to use LanternWeb 

# How It Works
    LanternWeb is a real-time game engine for your browser, it utilizes the html canvas api to render 2D graphics.

# Getting Started
    - Download the latest release from the releases section of the github repo for LanternWeb and read the README in the folder:
[LanternWeb Releases](https://github.com/Connor-Walden/jsengine/releases)

# Layer
    - Example: 
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
    - First, extend the Layer class and create a constructor and an OnAttach function
    - In the constructor you must add super(name) for the engine to create the layer properly
    - not 100% necessary but i like to create a renderer variable for the class 
    - In the OnAttach function you can add your own entity creation methods in the array.
    - if you keep the addEntity loop and the super.OnAttach the entities will be correctly registered and their event will fire.

# Creating Entities
    - Example:
        // Create the entity
        const example_entity = new Entity(0, 'background');

        // Create and add your components...

    - Create a new Entity and give it a layer-specific ID and name
    - Add components where the comment dictates

# Components
    - Transform 
        - Example:
            const example_transform = new Transform(
                example_entity, {
                    x: 0,
                    y: 0
                },
                0,
                1
            );
            example_entity.AddComponent(example_transform);
        - Create the Transform component and initialize the different values:
            - Entity
            - Pos ( Obj => { x, y })
            - Rotation ( Degrees )
            - Scale

    - SpriteRenderer
        - Example:
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
            example_entity.AddComponent(example_sprite_renderer);
        - Create the SpriteRenderer component and initialize the different values:
            - Entity
            - Renderer
            - Image
            - Pos ( Obj => { x, y, w, h }) - TEMPORARY, in v1.1 will use transform values and this will be removed from the SpriteRenderer Component

    - ShapeRenderer
        - Example:
            const example_shape_renderer = new ShapeRenderer(
                example_entity,
                renderer,
                'rect', {
                    x: 0,
                    y: 0,
                    w: 100,
                    h: 100
                }, {
                    r: 255,
                    g: 0,
                    b: 0
                }, true
            );
            example_entity.AddComponent(example_shape_renderer);
        - Create the ShapeRenderer component and initialize the different values:
            - Entity
            - Renderer
            - Shape Name ( rect, arc )
            - Pos ( Obj => { x, y, w, h }) - TEMPORARY, in v1.1 will use transform values and this will be removed from the ShapeRenderer Component
            - Color ( Obj => { r, g, b } )
            - fill ( true, false )

    - TextRenderer
        - Example:
            const example_text_renderer = new TextRenderer(
                example_entity,
                renderer,
                'this is a msg', 
                '24px', {
                    r: 255,
                    g: 255,
                    b: 255
                }, {
                    x: 100,
                    y: 100
                }, true
            );
            example_entity.AddComponent(example_text_renderer);
        - Create the TextRenderer component and initialize the different values:
            - Entity
            - Renderer
            - Text
            - Size
            - Color ( Obj => { r, g, b } )
            - Pos ( Obj => { x, y }) - TEMPORARY, in v1.1 will use transform values and this will be removed from the ShapeRenderer Component
            - Center ( true, false )

    - Animator
        - Example:
            const example_animator = new Animator(
                example_entity, {
                    name: 'test animation',
                    frames: [
                        new Sprite(this.renderer, 'img/test.jpg', 0, 0, 220, 277),
                        new Sprite(this.renderer, 'img/test.jpg', 100, 0, 220, 277),
                        new Sprite(this.renderer, 'img/test.jpg', 200, 0, 220, 277),
                        new Sprite(this.renderer, 'img/test.jpg', 300, 0, 220, 277)
                    ],
                    frameRate: 10,
                    loop: true
                }
            );
            example_entity.AddComponent(example_animator);
        - Create the Animator component and initialize the different values:
            - Entity
            - Data ( Obj => {
                Name
                Frames (Array of sprites)
                FrameRate
                Loop
            })

    - Button
        - Example:
            const example_button = new Button(
                example_entity,
                renderer,
                'button title', {
                    r: 255,
                    g: 255,
                    b: 255
                }, () => { console.log('button clicked!') }
            );
            example_entity.AddComponent(example_button);
        - Create the Button component and initialize the different values:
            - Entity
            - Renderer
            - Text
            - Color ( Obj => { r, g, b } )
            - Callback ( the function to be called when the button is clicked )

    - Script
        - Example:
            const example_script = new Script(
                example_entity, {
                    OnAttach: () => {

                    },
                    OnUpdate: () => {

                    }
                }
            );
            example_entity.AddComponent(example_script);
        - Create the Script component and initialize the different values:
            - Entity
            - Scripts ( Obj => { OnAttach(), OnUpdate() } )