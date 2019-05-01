
class Border {
    constructor() {
        // получить объект холста, получить двумерный контекст рисования getContext('2d')
        this.canvas = document.getElementById('canvas');
        this.elemLeft = this.canvas.offsetLeft;
        this.elemTop = this.canvas.offsetTop;
        this.ctx = this.canvas.getContext('2d');
        // размеры квадрата
        this.sideSquare = 50;
        // массив возможных цветов
        this.colors = ['white', 'black'];
        this.activeColor = 'blue';
        this.predictColorSteps = 'green';
        // массив квадратов
        this.squares = [];
        // начальная инициализация массива цветов квадратов и его заполнение дефолтным знацением
        this.colorsRectangles = Array.from({ length: 64 },
            (item, index) => (index % 2 ? this.colors[1] : this.colors[0]));
        this.side = Array.from({ length: 8 }, (item, index) => index);

        this.letters = [...'ABCDEFGH'];
    }

    // Задание значений для всех квадратов
    init() {
        this.defaultState();
        return this;
    }

    defaultState() {
        // очистка холста
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.squares = [];
        this.side.forEach((item, y) => {
            const top = y * this.sideSquare + 25;

            this.side.forEach((items, x) => {
                if (y === 0 || y === 7) {
                    this.drawLabels(this.letters[x], x * this.sideSquare + 45, y ? 17 : 443);
                    this.drawLabels(this.side.length - x, y ? 7 : 433, x * this.sideSquare + 55);
                }

                let field = y * this.side.length + x;
                if (y % 2) {
                    field = !(field % 2);
                }
                this.squares.push({
                    x: x * this.sideSquare + 25,
                    y: top,
                    pos: `${this.letters[x]}${this.side.length - y}`,
                    color: field % 2 ? this.colors[1] : this.colors[0],
                });
            });
        });
        this.drawRectangles();
        return this;
    }

    drawLabels(letter, x, y) {
        this.ctx.font = '15px Arial';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(letter, x, y);
    }

    // отрисовка всех квадратов
    drawRectangles() {
        this.squares.forEach((item) => {
            this.ctx.lineWidth = 1;
            this.ctx.fillStyle = item.color;
            this.ctx.fillRect(item.x, item.y, this.sideSquare, this.sideSquare);
            this.ctx.strokeStyle = 'rgb(108,117,125)';
            this.ctx.strokeRect(item.x, item.y, this.sideSquare, this.sideSquare);
        });
        return this;
    }

    start() {
        this.canvas.addEventListener('click', e => this.game(e), false);
        return this;
    }

    game(e) {
        this.defaultState();
        // вычисление позиции курсора
        const x = e.pageX - this.canvas.offsetLeft;
        const y = e.pageY - this.canvas.offsetTop;
        this.squares.some((item, index) => {
            if (y > item.y && y < item.y + this.sideSquare
                && x > item.x && x < item.x + this.sideSquare) {
                const { color } = item;

                if (color !== this.activeColor) {
                    this.squares[index].color = this.activeColor;
                    this.nextSteps(item.pos);
                } else {
                    return true;
                }
            }
            return false;
        });
    }

    nextSteps(move) {
        // объявление и вычисление значений введенной позиции.
        const letter = move.charAt(0);
        const num = Number(move.charAt(1));
        const pos = this.letters.indexOf(letter);
        const len = this.letters.length;

        // если позиция ошибна, завершить работу
        if (num < 1 || num > 8 || pos === -1) {
            return;
        }
        const steps = [];
        // Вычисление возможных ходов конем
        if ((num - 2) > 0) {
            if ((pos - 1) >= 0) {
                const index = (pos - 1) + (len - num + 2) * len;
                steps.push(index);
            }
            if ((pos + 1) < 8) {
                const index = (pos + 1) + (len - num + 2) * len;
                steps.push(index);
            }
        }
        if ((num - 1) > 0) {
            if ((pos - 2) >= 0) {
                const index = (pos - 2) + (len - num + 1) * len;
                steps.push(index);
            }
            if ((pos + 2) < 8) {
                const index = (pos + 2) + (len - num + 1) * len;
                steps.push(index);
            }
        }
        if ((num + 1) <= 8) {
            if ((pos - 2) >= 0) {
                const index = (pos - 2) + (len - num - 1) * len;
                steps.push(index);
            }
            if ((pos + 2) < 8) {
                const index = (pos + 2) + (len - num - 1) * len;
                steps.push(index);
            }
        }
        if ((num + 2) <= 8) {
            if ((pos - 1) >= 0) {
                const index = (pos - 1) + (len - num - 2) * len;
                steps.push(index);
            }
            if ((pos + 1) < 8) {
                const index = (pos + 1) + (len - num - 2) * len;
                steps.push(index);
            }
        }

        steps.forEach((item) => {
            this.squares[item].color = this.predictColorSteps;
        });
        this.drawRectangles();
    }
}

export default new Border();
