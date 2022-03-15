export const RC_CONTENT = {
    baccarat: {
        rules: true,
        title: 'Baccarat',
        content: [
            <p>First of all, it is necessary to explain the value of the cards. An ace is worth one point. Cards 2-9 are worth their face value. The Tens, Jacks (J), Queens (Q) and Kings (K) have the value of zero. In all cases, the colour of the card is of no importance.</p>,
            <p>The game is played either with six or eight decks of cards mixed together, of course, without any jokers. The odds of winning are very similar in both cases, with only a small difference measured in a thousandths of one percent. Therefore the further analysis here will deal solely with the eight decks version that predominates in online casinos.</p>,
            <p>The game itself is initiated by placing bets. You can bet on either the banker – Banco, on the player - Punto or on a tie - Tie. You place a bet before your first card has been turned face up. The result of the game thus depends purely on chance, so Baccarat is very similar to throwing a dice or spinning the ball in roulette.</p>,
            <p>After all bets have been placed, two cards are dealt to both the player and the banker. The winner is the one who has a score of 8 or 9. This state is called "natural" while having a score of 9 is more than 8, and a tie is possible as well. If the player or the banker holds cards with a total that exceeds nine, then the last digit of this total is taken into account. Thus for example, 8 + 2 = 10, the resulting value is 0, or for example 5 + 7 = 12, leaving 2 as the value of this hand.</p>,
            <p>In case neither the Player nor the Banker are dealt a "natural hand", with a total of 8 or 9 for the first two cards, a third card can be dealt under strict conditions. These rules are the only complicated part of the game. There is no great need to learn these conditions as they are automatically implemented by the casino, but it is still good to have some understanding of them:</p>,
            <ul>
                <li>If the player has an initial total of 6 or 7, he stands. The banker then draws a third card, but only if he has an initial total of 0-5</li>
                <li>If the player has an initial total of 0-5, he draws a third card</li>
                <li>If the player draws a third card, the banker will also draw a third card. This depends on the value of the player's third card and the initial total for the banker:
                    <ul>
                        <li>If the banker's total is 0,1 or 2, then the banker always draws a card</li>
                        <li>If the banker's total is 3, then the banker draws a third card, unless the player's third card was an 8</li>
                        <li>If the banker's total is 4, then the banker draws a third card, unless the player's third card was 0, 1, 8, 9</li>
                        <li>If the banker's total is 5, then the banker draws a third card, if the player's third card was 4, 5, 6, or 7</li>
                        <li>If the banker's total is 6, then the banker draws a third card, if the player's third card was a 6 or 7</li>
                        <li>If the banker's total is 7, then the banker stands and doesn’t draw a third card.</li>
                    </ul>
                </li>
            </ul>,
            <p>When the player and the banker have both been dealt their cards, as set out by the rules mentioned above, the outcome of the game is announced. The hand with the highest value is the winning one, and if the hands are of equal value, there is a tie.</p>,
            <h3>PAYOUT</h3>,
            <p>If you bet on the player or on the banker and the game ends in a tie, your bet is returned. If you bet on the player and the player actually wins, the payout ratio is 1: 1. So you get your bet back plus your winnings of the same amount. The bet on the banker is in this case the losing one. If you bet on the banker and the banker actually wins, the payout ratio is 0.95: 1. The 5% represents the commission for the casino and ensures the casino´s profitability even under these types of bets. To put it more clearly, if you bet 100 chips on the banker and the banker wins, you will get 195 chips in return. The bet on the player is in this case the losing one. If you bet on a tie and the player´s and the banker’s hands are of identical value, you can enjoy a substantial win amounting to eight or nine times your initial bet. However, the win is considerable only at first glance. As it will be explained below, if you want to play for the longest possible time, the bet on a tie should be avoided like the plague. In the case of a payout ratio being 8:1, a bet on a tie is literally financial suicide, but also even if a payout ratio is 9:1, it is still statistically the least favourable bet.</p>,
        ]
    },
    blackjack: {
        rules: true,
        title: 'Blackjack',
        content: [
            <p>Cards from 2 to 10 have their face value, the cards from jack to a king are worth 10 points and an ace is worth a variable value of 1 or 11. An ace has the ability to create so-called "soft" combinations, which practically means that, given an ace and 8, the total can be either 9 or 19. This is called "soft 19". This value of the combination at the start of the hand counts as 19, but if a player draws another card and the sum exceeds 21, the value of the ace is reduced to 1.</p>,
            <p>Blackjack is played against the dealer, with the player aiming to obtain a higher value hand than the dealer, but not exceeding the value of 21. If you exceed 21, the game is over regardless of the sum the dealer has reached. If the dealer exceeds the limit of 21, the player wins, but only if the player hasn't exceeded the limit of 21 himself or herself.</p>,
            <p>If the player gets a combination of an ace and a card worth 10, the player receives a reward for blackjack in the ratio of 3:2 (a bet of $1 wins $2.50, including the wagered $1).</p>,
            <p>There is also a rule that after reaching the sum of 17, the dealer does not draw another card. The instructions and rules in play are always displayed. Usually the instruction says "Dealer stands at soft 17" and "Blackjack pays 3 to 2".</p>
        ]
    },
    craps: {
        rules: true,
        title: 'Craps',
        content: [
            <p>One player, known as the “shooter,” throws the dice at the craps table. All wagers must be placed before the shooter throws the dice. The types of wagers that can be made are:</p>,
            <h3>Pass Line</h3>,
            <p>An even money bet, made on the first roll of the dice (known as the “come out roll”). You win if a 7 or 11 roll, or lose if 2, 3, or 12 roll (known as “craps”). Any other number that rolls becomes the “point” and the point must roll again before a 7 to win.</p>,
            <h3>Don't Pass Line</h3>,
            <p>An even money bet, which is the opposite of the pass line. You lose on the “come out” roll if the shooter rolls a 7 or 11. You win on a 2 or 3 (12 is a tie). Once a point is established, you lose if the point is thrown and win if a 7 rolls.</p>,
            <h3>Come Bets</h3>,
            <p>Made anytime after the first roll when a shooter has a point to make. You win on a 7 or 11 and lose on a 2, 3 or 12. Any other number becomes your “come point” and must be repeated for you to win before a 7 rolls.</p>,
            <h3>Don't Come Bets</h3>,
            <p>Made anytime after the first roll when a shooter has a point to make. It is the opposite of the come bet. You win if 2 or 3 roll (12 is a tie), and lose if 7 or 11 roll. Any other number rolled becomes your “come point” and if repeated you lose. If a 7 rolls you win.</p>,
            <h3>Craps Odds</h3>,
            <p>Once a point is made on the first roll or a come point on a succeeding roll, you may take the odds and win if the point or come points are made before a 7. Payoffs are: 2 to 1 on 4 and 10, 3 to 2 for 5 and 9, 6 to 5 on 6 and 8. “Don’t pass” or “don’t come” bets are in reverse: you must lay the odds in order to win.</p>,
            <h3>Place Bets</h3>,
            <p>Once a shooter makes a point, you may make a “place bet” on numbers 4, 5, 6, 8, 9, and 10. If the shooter rolls any of these numbers before a 7, you win the following payoffs: 9 to 5 on 4 and 10, 7 to 5 on 5 and 9, and 7 to 6 on 6 and 8. A “place bet” may be taken off anytime before the next roll.</p>,
            <h3>Field Bets</h3>,
            <p>A one roll bet. You win even money on 3, 4, 9, 10 and 11. You win 2 to 1 on 2. You win 3 to 1 on 12. You lose on 5, 6, 7 or 8.</p>,
            <h3>Proposition Bets</h3>,
            <p>These bets are found in the center of the table and are one-roll bets. You are betting that on the very next roll of the dice any of these numbers will come up:</p>,
            <ul>
                <li>Any Craps (2, 3 or 12)		pays 8 for 1</li>
                <li>Aces (2) or Twelve (12)		pays 31 for 1</li>
                <li>Ace-Deuce (3) or Eleven (11)		pays 16 for 1</li>
                <li>Seven (7)				pays 5 for 1</li>
            </ul>,
            <h3>Hardaways</h3>,
            <p>A Hardway bet is not a one-roll bet. You are betting that the shooter rolls a pair. Hardways win if the dice roll as a pair and lose if a 7 rolls or if the number is thrown “the easy way.” Example: If you bet a hard 8 and the dice roll 4,4 you win. If the dice roll “easy” 5,3 or 6,2 you lose.</p>,
            <ul>
                <li>Hard Four or Ten	    pays 8 for 1</li>
                <li>Hard Six or Eight	pays 10 for 1</li>
            </ul>,
            <h3>Hop Bets</h3>,
            <p>Hop Bets are a one roll bet on a specific combination of the dice. You are literally betting on what you think the very next roll of the dice will be.</p>,
            <p>If you think the next roll is going to be a (6, 3), you would tell the dealer that you want the 6 and 3 hopping. Hop bets pay 31 for 1 or 16 for 1 depending on the combination that you choose.</p>
        ]
    },
    poker: {
        rules: true,
        title: 'Poker',
        content: [
            <p>In a game of Texas hold'em, each player is dealt two cards face down (the 'hole cards')</p>,
            <ul>
                <li>Over several betting rounds, five more cards are (eventually) dealt face up in the middle of the table.</li>
                <li>These face-up cards are called the 'community cards.' Each player is free to use the community cards in combination with their hole cards to build a five-card poker hand.</li>
            </ul>,
            <p>The Flop: the first three community cards.</p>,
            <p>The Turn: the fourth community card.</p>,
            <p>The River: the fifth and final community card.</p>,
            <ul>
                <li>Your mission is to construct your five-card poker hands using the best available five cards out of the seven total cards (your two hole cards and the five community cards).</li>
                <li>You can do that by using both your hole cards in combination with three community cards, one hole card in combination with four community cards, or no hole cards.</li>
                <li>If the cards on the table lead to a better combination, you can also play all five community cards and forget about yours.</li>
                <li>In a game of Texas hold'em you can do whatever works to make the best five-card hand.</li>
                <li>If the betting causes all but one player to fold, the lone remaining player wins the pot without having to show any cards.</li>
                <li>00</li>
                <li>For that reason, players don't always have to hold the best hand to win the pot. It's always possible a player can 'bluff' and get others to fold better hands.</li>
            </ul>
        ]
    },
    tyc: {
        rules: false,
        blue: 'Terms ',
        white: 'and ',
        pink: 'Conditions'
    },
    policies: {
        rules: false,
        blue: 'Privacy ',
        pink: 'Policies'
    },
    none: {
        content: [
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris est risus, varius pellentesque condimentum et, consectetur nec magna. Donec finibus hendrerit elit, eget congue velit viverra sit amet. Vestibulum id libero ullamcorper, auctor enim ut, bibendum est. Phasellus non nulla vitae diam venenatis luctus. Sed volutpat semper mi, vitae maximus felis bibendum vitae. Pellentesque luctus ligula sed sodales euismod. Quisque volutpat interdum tellus, ac cursus ex condimentum viverra. Sed molestie nisi quam, vel interdum nisl ullamcorper eu. Suspendisse ut ante eros. Nam laoreet, ipsum viverra sagittis egestas, purus arcu dictum sem, et lobortis justo est eu felis. Proin pulvinar vestibulum magna, eu accumsan leo finibus ac. Curabitur id urna ac est maximus tincidunt quis eu diam. Pellentesque condimentum lectus feugiat metus egestas, a volutpat massa ullamcorper. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec non nisi nec dui feugiat lobortis ut id est. Donec lectus massa, accumsan vel porta eu, congue vitae ante.</p>,
            <p>Proin est eros, consectetur in lacinia vel, elementum vel sapien. Sed egestas vel purus eu convallis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec vel augue non risus tempor faucibus sed vitae nunc. Aenean quis suscipit nisi. Curabitur cursus tortor in enim mollis pharetra vitae nec nulla. In hac habitasse platea dictumst. Etiam consequat, eros et condimentum imperdiet, magna neque gravida ligula, eget euismod turpis urna quis risus. Sed et eleifend ligula, vitae vestibulum ante. Quisque at enim justo. Nullam eros lacus, iaculis eu eros sed, efficitur dapibus arcu. Praesent sollicitudin tortor vitae magna lacinia, at pulvinar libero bibendum. Cras et porttitor urna, eu dictum ligula. Curabitur rhoncus mollis velit, et facilisis lacus interdum dignissim. Duis nec mattis orci, et faucibus purus.</p>,
            <p>Sed ante risus, efficitur a pharetra a, finibus at ante. Fusce ac sem sed massa pulvinar congue. Integer vitae vestibulum arcu. Sed sed efficitur mi. Maecenas aliquam efficitur magna at varius. Sed hendrerit, justo nec luctus tincidunt, nulla neque consequat orci, ut tempus mauris metus fringilla quam. Duis sit amet enim eros. Morbi vulputate tellus gravida nibh mollis malesuada vitae nec ante. Quisque ut ornare ex, eu efficitur sapien. Nam id venenatis dolor. Maecenas mattis lacinia nunc, vitae congue ipsum commodo vel.</p>,
            <h3>Lorem ipsum</h3>,
            <ul>
                <li>Ut quis sem et dui tempor porta eget vel lacus.</li>
                <li>Cras ultrices justo ac massa sagittis scelerisque.</li>
                <li>Fusce quis velit id ipsum consectetur ornare.</li>
            </ul>,
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id mi interdum, faucibus risus et, accumsan elit. In et velit non ante porttitor tempus non eu velit. Nullam condimentum pretium sapien, vel cursus mi convallis a.</p>
        ]
    }
}