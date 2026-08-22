controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
	
})
function Dialogue (Text: string) {
    DialogueText = fancyText.create(Text, 150, 15, fancyText.geometric_sans_7)
    DialogueCursor = sprites.create(img`
        6 8 8 6 
        6 6 8 6 
        6 6 8 8 
        6 8 8 8 
        `, SpriteKind.Player)
    DialogueCursor.setPosition(145, 70)
    fancyText.setFrame(DialogueText, img`
        . f f f f f f f f f f f f f . 
        f 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
        f 5 1 1 1 1 1 1 1 1 1 1 1 5 f 
        f 5 1 1 1 1 1 1 1 1 1 1 1 5 f 
        f 5 1 1 1 1 1 1 1 1 1 1 1 5 f 
        f 5 1 1 1 1 1 1 1 1 1 1 1 5 f 
        f 5 1 1 1 1 1 1 1 1 1 1 1 5 f 
        f 5 1 1 1 1 1 1 1 1 1 1 1 5 f 
        f 5 1 1 1 1 1 1 1 1 1 1 1 5 f 
        f 5 1 1 1 1 1 1 1 1 1 1 1 5 f 
        f 5 1 1 1 1 1 1 1 1 1 1 1 5 f 
        f 5 1 1 1 1 1 1 1 1 1 1 1 5 f 
        f 5 1 1 1 1 1 1 1 1 1 1 1 5 f 
        f 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
        . f f f f f f f f f f f f f . 
        `)
    pauseUntil(() => controller.A.isPressed())
    pauseUntil(() => !(controller.A.isPressed()))
    sprites.destroy(DialogueText)
    sprites.destroy(DialogueCursor)
}
stateTransitions.onStateEvent(stateTransitions.TransitionEvent.Enter, "Battle", function () {
    AntQueen = sprites.create(img`
        . . . . . f f f f . . . . . . . 
        . . . . f e e e e f . . . . . . 
        . . . . f e f f f f . . . . . . 
        . . . . f e f f f f . . . . . . 
        . . . . . f f f f . . . . . . . 
        . . f . . . f f . . . f . . . . 
        . . . f f f e e f f f . . . . . 
        . . . . . f e f f . . . . . . . 
        . . . f f f e f f f f . . . . . 
        . . f . . . f f . . . f . . . . 
        . . . . f f e e f f . . . . . . 
        . . . f f e f f f f f . . . . . 
        . . f . f e f f f f . f . . . . 
        . . . . f e f f f f . . . . . . 
        . . . . . f e f f . . . . . . . 
        . . . . . . f f . . . . . . . . 
        `, SpriteKind.Player)
    controller.moveSprite(AntQueen)
    Antlion = sprites.create(img`
        4 4 4 
        4 5 4 
        4 4 4 
        `, SpriteKind.Enemy)
    Antlion.setPosition(67, 22)
    timer.after(500, function () {
        stateTransitions.spriteChangeState(Antlion, "Attacking ")
        easing.blockEaseTo(Antlion, AntQueen.x, AntQueen.y, 1000, easing.Mode.InCubic)
        timer.background(function () {
            pauseUntil(() => !(easing.isEasing(Antlion)))
        })
    })
})
let Antlion: Sprite = null
let AntQueen: Sprite = null
let DialogueCursor: Sprite = null
let DialogueText: fancyText.TextSprite = null
stateTransitions.changeState("Dialogue")
scene.setBackgroundColor(5)
for (let index = 0; index < 7; index++) {
    scene.backgroundImage().drawTransparentImage(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 4 4 4 4 4 4 . . . . . 
        . . . . . 4 4 4 4 4 4 4 . . . . 
        . . . . . . . 4 4 4 4 4 4 . . . 
        . . . . . . . . . 4 4 4 4 4 . . 
        . . . . . . . . . . 4 4 4 . . . 
        . . . . . . . . . . . . 4 . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, randint(0, 160), randint(0, 120))
}
for (let index = 0; index < 7; index++) {
    scene.backgroundImage().drawTransparentImage(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . 4 4 4 . . . . . 
        . . . . . 4 4 4 4 4 4 . . . . . 
        . . . . . . 4 4 4 . . . . . . . 
        . . . . . 4 4 4 4 4 4 . . . . . 
        . . . . . 4 4 4 4 4 4 4 . . . . 
        . . . . . . . 4 4 4 4 4 . . . . 
        . . . . . . . . 4 4 4 . . . . . 
        . . . . . . . . 4 . 4 . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, randint(0, 160), randint(0, 120))
}
for (let index = 0; index < 7; index++) {
    scene.backgroundImage().drawTransparentImage(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 4 4 4 . . . . . . . . 
        . . . . . 4 4 4 . . . . . . . . 
        . . . . . 4 4 4 4 . . . . . . . 
        . . . . . 4 4 4 4 . . . . . . . 
        . . . . . b 4 4 4 4 4 . . . . . 
        . . . . . b 4 4 4 4 4 . . . . . 
        . . . . b b 4 4 4 4 4 . . . . . 
        . . . b 4 4 4 4 4 4 . . . . . . 
        . . . b 4 4 4 4 4 . . . . . . . 
        . . . b 4 4 . . . . . . . . . . 
        . . . b b b . . . . . . . . . . 
        `, randint(0, 160), randint(0, 120))
}
Dialogue("You will be <shake>CRUSHED</shake> little queen")
Dialogue("You were mistaken when you trespassed on my pit")
Dialogue("Your colony will make a good lunch for me")
stateTransitions.changeState("Battle")
