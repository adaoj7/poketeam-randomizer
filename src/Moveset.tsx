const Moveset = (pokemon: any) => {
    // interface Moves {
    //     move:{
    //         name: string
    //     }
    //     version_group_details: any
    // }

    const pokemonMoves = pokemon.pokemon.moves.map((ele: any, i: number) => {
        
        const levelUpArr = ele.version_group_details.filter((ele: any) => {
            return (
                ele.version_group.name === "emerald" &&
                ele.move_learn_method.name === "level-up"
            );
        });

        return [levelUpArr.length > 0 ? (
                    <div key={i} className="card w-80 m-4 bg-base-100 flex">
                        <div className="card-body">
                            <div className="">Move: {ele.move.name},</div>
                            <div>
                                Level Learned: {levelUpArr[0].level_learned_at}
                            </div>
                            <div>
                                Learn Method:{" "}
                                {levelUpArr[0].move_learn_method.name}
                            </div>
                        </div>
                    </div> ) : null
        ].filter(Boolean)
    });

    return (
        <div className="flex flex-row flex-wrap justify-center mt-8">
            {pokemonMoves}
        </div>
    );
};
export default Moveset;
