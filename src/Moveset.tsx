const Moveset = (pokemon: any) => {

    // interface Moves {
    //     move:{
    //         name: string
    //     }
    //     version_group_details: any
    // }

    const pokemonMoves = pokemon.pokemon.moves.map((ele:any ,i:number) => {



        const newArr = ele.version_group_details.filter((ele:any, ) => {
           return ele.version_group.name === 'emerald'
        })
        
        if (newArr.length > 0) {
            return (
                <div key={i} className="card flex flex-row">
                    <div className="">
                        Move: {ele.move.name}, 
                    </div>
                    <div >
                        Level Learned: {newArr[0].level_learned_at}
                    </div>
                </div>
            )
        }
    })


  return (
    <>{pokemonMoves}</>
  )

  }
export default Moveset