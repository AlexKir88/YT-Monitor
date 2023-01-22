
const observe = (node) => {
    let observer = new MutationObserver((mutationsRecords) => {
        console.log(mutationsRecords)
    })
    observer.observe(node, {
        subtree: true,
        attributeFilter: true,
        characterData: true,
    })
}
export default observe;