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
        . . . f f f f f . . . 
        . . f 8 8 8 e e f . . 
        . . f e f f f f f . . 
        . . f e f f f f f . . 
        . . f e f f f f f . . 
        . . . f f f f f . . . 
        f . . . f f f . . . f 
        . f f f 8 8 e f f f . 
        . . . f e f f f . . . 
        . f f f e f f f f f . 
        f . . . f f f . . . f 
        . . f f 8 e f f f . . 
        . f f 8 e f f f f f . 
        f . f e f f f f f . f 
        . . f e f f f f f . . 
        . . f e f f f f f . . 
        . . f e f f f f f . . 
        . . . f e e f f . . . 
        . . . . f f f . . . . 
        . . . . . f . . . . . 
        . . . . . f . . . . . 
        `, SpriteKind.Player)
    controller.moveSprite(AntQueen)
    Antlion = sprites.create(img`
        4 4 4 
        4 5 4 
        4 4 4 
        `, SpriteKind.Enemy)
    Antlion.setPosition(67, 22)
    timer.after(500, function () {
        GenerateAntlionAttacks()
        stateTransitions.spriteChangeState(Antlion, "Attacking ")
    })
})
function createdirt () {
    Dirt = sprites.create(img`
        . b b . 
        b 4 4 b 
        c b b c 
        . c c . 
        `, SpriteKind.Projectile)
    Dirt.setPosition(PitSprite.x, PitSprite.y)
}
function GenerateAntlionAttacks () {
    stateTransitions.spriteOnStateEvent(Antlion, stateTransitions.TransitionEvent.Enter, "Attacking ", function (sprite) {
        easing.blockEaseTo(sprite, AntQueen.x, AntQueen.y, 1000, easing.Mode.InCubic)
        timer.background(function () {
            PitSprite = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.Player)
            PitSprite.setPosition(Antlion.x, Antlion.x)
            pauseUntil(() => !(easing.isEasing(sprite)))
            for (let PitGenIndex = 0; PitGenIndex <= 17; PitGenIndex++) {
                Pit = img`
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    ........................................
                    `
                drawing.drawCircle(Pit, drawing.DrawMode.Fill, drawing.createPoint(20, 20), PitGenIndex, 5)
                drawing.drawCircle(Pit, drawing.DrawMode.Outline, drawing.createPoint(20, 20), PitGenIndex, 4)
                drawing.drawCircle(Pit, drawing.DrawMode.Outline, drawing.createPoint(20, 20), PitGenIndex - 5, 4)
                drawing.drawCircle(Pit, drawing.DrawMode.Fill, drawing.createPoint(20, 20), PitGenIndex - 5, 4)
                drawing.drawCircle(Pit, drawing.DrawMode.Outline, drawing.createPoint(20, 20), PitGenIndex - 10, 11)
                drawing.drawCircle(Pit, drawing.DrawMode.Fill, drawing.createPoint(20, 20), PitGenIndex - 10, 11)
                drawing.drawCircle(Pit, drawing.DrawMode.Outline, drawing.createPoint(20, 20), PitGenIndex - 15, 12)
                drawing.drawCircle(Pit, drawing.DrawMode.Fill, drawing.createPoint(20, 20), PitGenIndex - 15, 12)
                PitSprite.setImage(Pit)
                for (let index = 0; index < 2; index++) {
                    createdirt()
                    spriteutils.setVelocityAtAngle(Dirt, spriteutils.degreesToRadians(PitGenIndex * 30 + randint(-30, 30)), 30)
                }
                createdirt()
                spriteutils.setVelocityAtAngle(Dirt, spriteutils.degreesToRadians(PitGenIndex * 30 + 180), 60)
                pause(100)
            }
            pause(400)
            for (let index = 0; index < 2; index++) {
                for (let DirtGenIndex = 0; DirtGenIndex <= 8; DirtGenIndex++) {
                    createdirt()
                    spriteutils.setVelocityAtAngle(Dirt, spriteutils.degreesToRadians(DirtGenIndex * randint(60, 120)), randint(20, 60))
                    pause(10)
                }
                pause(500)
            }
        })
    })
}
let Pit: Image = null
let PitSprite: Sprite = null
let Dirt: Sprite = null
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
