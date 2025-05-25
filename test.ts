type Card = {
    cardNumber: number;
    cardLetter: string;
    cardCode: string;
};

type Player = {
    index: number;
    cards: Card[];
};

class BaraBara {
    public pendingCards: Card[] = [];
    public players: Player[] = Array.from({ length: 4 }, (_, index) => ({ index, cards: [] }));

    constructor() {
        for (const cardLetter of ["A", "B", "C", "D"]) {
            for (let cardNumber = 1; cardNumber <= 13; cardNumber++) {
                this.pendingCards.push({
                    cardNumber,
                    cardLetter,
                    get cardCode(): string {
                        return this.cardNumber + this.cardLetter;
                    }
                });
            }
        }
            
        this.shuffle();
    }

    public shuffle(): void {
        for (let i = this.pendingCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.pendingCards[i], this.pendingCards[j]] = [this.pendingCards[j], this.pendingCards[i]];
        }
    }

    public distribute(): void {
        let distributingPlayerIndex = 0;
        do {
            const card = this.pendingCards.shift();
            if (!card) {
                throw new Error("There is no remaining card to distribute.");
            }

            this.players[distributingPlayerIndex].cards.push(card);
            if (distributingPlayerIndex + 1 > 3) {
                distributingPlayerIndex = 0;
            } else {
                distributingPlayerIndex += 1;
            }
        } while (52 - this.pendingCards.length <= 10 + (9 * 3));
    }
}

const baraBara = new BaraBara();
baraBara.distribute();
console.log(JSON.stringify(baraBara.players.map(p => ({ index: p.index, cards: p.cards.map(c => c.cardCode) })), null, 2));