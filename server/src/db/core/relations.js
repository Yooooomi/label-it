/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */

const Knex = require('knex');
const { Model } = require('objection');
const knexfile = require('../../../knexfile');

const knex = Knex(knexfile);

Model.knex(knex);

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static relationMappings() {
    return {
      labels: {
        modelClass: Label,
        relation: Model.HasManyRelation,
        join: {
          from: 'users.id',
          to: 'labels.user_id',
        },
      },
      pins: {
        modelClass: Pin,
        relation: Model.ManyToManyRelation,
        join: {
          from: 'users.id',
          through: {
            from: 'labels.user_id',
            to: 'labels.id',
          },
          to: 'pins.label_id',
        },
      },
    };
  }
}

class Label extends Model {
  static get tableName() {
    return 'labels';
  }

  static relationMappings() {
    return {
      user: {
        modelClass: User,
        relation: Model.BelongsToOneRelation,
        join: {
          from: 'labels.user_id',
          to: 'users.id',
        },
      },
      pins: {
        modelClass: Pin,
        relation: Model.HasOneRelation,
        join: {
          from: 'labels.pin_id',
          to: 'pins.id',
        },
      },
    };
  }
}

class Pin extends Model {
  static get tableName() {
    return 'pins';
  }

  static relationMappings() {
    return {
      user: {
        modelClass: User,
        relation: Model.HasOneThroughRelation,
        join: {
          from: 'pins.label_id',
          through: {
            from: 'labels.id',
            to: 'labels.user_id',
          },
          to: 'users.id',
        },
      },
      labels: {
        modelClass: Label,
        relation: Model.BelongsToOneRelation,
        join: {
          from: 'pins.id',
          to: 'labels.id',
        },
      },
    };
  }
}

module.exports = {
  Model,
  User,
  Label,
  Pin,
};
