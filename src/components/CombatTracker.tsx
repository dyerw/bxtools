import React, { useState, useRef } from "react";
import { Dice } from "dice-typescript";
import { range, sortBy } from "ramda";
import { v4 as uuidv4 } from "uuid";
import Button from "./common/Button";
import SkullIcon from "../assets/skull.svg";

const dice = new Dice();

type Monster = {
  id: string;
  name: string;
  sequence: number;
  maxHealth: number;
  currentHealth: number;
};

type State = {
  monsters: readonly Monster[];
};

const initialState: State = {
  monsters: [],
};

const CombatTracker = () => {
  const [state, setState] = useState<State>(initialState);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const numberInputRef = useRef<HTMLInputElement>(null);
  const hitDiceInputRef = useRef<HTMLInputElement>(null);

  const onAddMonsters = () => {
    const name = nameInputRef.current.value;
    const numberAppearing = parseInt(numberInputRef.current.value);
    const hitDice = parseInt(hitDiceInputRef.current.value);
    const monsters: Monster[] = range(0, numberAppearing).map((i) => {
      const health = dice.roll(`${hitDice}d8`);
      return {
        id: uuidv4(),
        name,
        sequence: i + 1,
        maxHealth: health.total,
        currentHealth: health.total,
      };
    });
    setState((currentState) => ({
      ...currentState,
      monsters: [...currentState.monsters, ...monsters],
    }));
  };

  const subtractHealth = (monsterId: string) => {
    setState((currentState) => {
      const monster = currentState.monsters.find((m) => m.id === monsterId);
      const currentHealth =
        monster.currentHealth - 1 > 0 ? monster.currentHealth - 1 : 0;
      return {
        ...currentState,
        monsters: [
          ...currentState.monsters.filter((m) => m.id !== monsterId),
          {
            ...monster,
            currentHealth,
          },
        ],
      };
    });
  };

  return (
    <div className="flex flex-col max-width-lg">
      <div className="flex flex-row">
        <input ref={nameInputRef} placeholder="Monster Name" />
        <input ref={numberInputRef} placeholder="Number" type="number" />
        <input ref={hitDiceInputRef} placeholder="Hit Dice" type="number" />
        <Button onClick={onAddMonsters}>Add</Button>
      </div>
      {sortBy((m) => m.sequence, state.monsters).map((m) => (
        <div key={m.id} className="flex flex-row">
          <div className="bg-gray-900 text-white font-semibold w-28 flex justify-center items-center">
            {`${m.name} ${m.sequence}`}
            {m.currentHealth === 0 ? <SkullIcon /> : ""}
          </div>
          <div className="w-20 flex justify-center items-center">
            {m.currentHealth}/{m.maxHealth}
          </div>
          <Button onClick={() => subtractHealth(m.id)}>-</Button>
        </div>
      ))}
    </div>
  );
};

export default CombatTracker;
