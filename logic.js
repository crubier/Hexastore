

// How to store an object: as is if it is a string, stringified otherwise
function val(obj) {
  if (typeof obj === 'string' || obj instanceof String) {
    return obj;
  } else {
    return JSON.stringify(obj);
  }
}





// Algorithme de normalisation
// (1) Réecrire les equivalences
//     ( φ ↔ ψ ) => ( ( φ → ψ ) ∧ ( ψ → φ ) )
// (2) Réecrire les implications
//     ( φ → ψ ) => ( ¬φ ∨ ψ)
// (3) Réecrire en utilisant les lois de De Morgan :
//     ¬( φ ∧ ψ ) => ( ¬φ ∨ ¬ψ )
//     ¬( φ ∨ ψ ) => ( ¬φ ∧ ¬ψ )
// (4) Annuler les doubles négations
//     ¬( ¬φ ) => φ
// (5) Réecrire en utilisant les lois de distributivité :
//    ( φ ∨ ( ψ ∧ ζ ) ) => ( ( φ ∨ ψ ) ∧ ( φ ∨ ζ ) )
//    ( ( φ ∧ ψ ) ∨ ζ ) => ( ( φ ∨ ζ ) ∧ ( ψ ∨ ζ ) )




// A theory is an object containing the 8 XXX functions : XXX, XXO, XPX, XPO,  SXX, SXO, SPX, SPO
// The XXX functions :
//   is null if the theory can't solve the query generally, need more information
//   returns null if the theory can solve the query generally, but not this query in particular with its specific parameters
//   returns [] if the theory can solve this query in particular and found no results
//   returns [fact(...),fact(...)] if the theory can solve this query in particular and found results
