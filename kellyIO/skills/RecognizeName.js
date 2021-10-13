export default function RecognizeName(context) {
  console.log(context)

  return function useRecognizeNameSkill(input) {

    if(input.includes('Kelly')) {
      console.log('You called me!')
    }

    return input
  };
}
