const layout = require('../layout')

const { getError } = require('../../helper')

module.exports = ({ errors }) => {
    return layout({
        content: `
         <form method="POSE">
            <input placeholder="Title" name="title"/>
            <input placeholder="Price" name="price"/>
            <input type="file" name="image" />
            <button>Submit</button>
         </form>
        `
    })
}