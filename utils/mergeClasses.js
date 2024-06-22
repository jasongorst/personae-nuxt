import { mergeProps } from "vue"

export default function mergeClasses(...args) {
  // map args to array of props-like objects with 'class' properties
  const objAry = args.map((arg) => ({ class: arg }))

  // use vue's mergeProps to handle 'class' merging
  const merged = mergeProps(...objAry)

  // return merged classes
  return merged.class
}
