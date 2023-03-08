<script context="module">
    export function updateRating(sheet, item, type, value) {
        //sheet?._updateActorAbility(item, type, value);
        //console.log ("updateRating")

        const ob = { [type]: value };
        if (type == "rank" || type == "rating" || type == "level") {
            if (value < 1) ob[type] = 1;
            ob.fail = 0;
            ob.pass = 0;
        }
        sheet?._updateEmbededItem(item, ob);
    }

    export function setMouseDice(sheet, count, message = "") {
        sheet?._setMouseDice(count, message);
    }

    export function isLimitedView(sheet) {
        return !game.user.isGM && sheet.actor.limited;
    }
</script>
