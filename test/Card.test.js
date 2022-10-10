import assert from "assert"
import chai from 'chai'
import { expect } from 'chai'
import Card from '../src/Card.js'

describe("getPoints()", () => {
    const numericValues = [2, 4, 5, 6, 7, 8, 9, 10];
    const letterValues = ['A', 'K', 'J', 'Q'];
    function testPointsNumbers(number) {
        it(`should return ${number} if the value of a card is ${number}`, () => {
            assert.equal(new Card(number).getPoints(), number);
        })

    }

    function testPointsLetters(letter) {
        switch (letter) {
            case ('A'):
                it(`should return 11 if the value of a card is ${letter}`, () => {
                    assert.equal(new Card(letter).getPoints(), 11);
                });
                break;
            case ('J'):
                it(`should return 10 if the value of a card is ${letter}`, () => {
                    assert.equal(new Card(letter).getPoints(), 10);
                });
                break;
            case ('Q'):
                it(`should return 10 if the value of a card is ${letter}`, () => {
                    assert.equal(new Card(letter).getPoints(), 10);
                });
                break;
            case ('K'):
                it(`should return 10 if the value of a card is ${letter}`, () => {
                    assert.equal(new Card(letter).getPoints(), 10);
                });
                break;
        }
    }
    for (let element of numericValues) {
        testPointsNumbers(element);
    }

    for (let element of letterValues) {
        testPointsLetters(element);
    }
})