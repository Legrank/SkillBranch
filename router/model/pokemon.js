/**
 * Created by Dima on 25.11.2016.
 */
import mongoose from 'mongoose';
import _ from 'lodash';

const { Schema } = mongoose;
const PokemonSchema = new Schema({
    height: Number,
    weight: Number,
    angular: Number,
    name: String
},{
    timestamps: true
});

PokemonSchema.methods.toJSON = function () {
    return this.name;
}

module.exports = mongoose.model('Pokemon',PokemonSchema);