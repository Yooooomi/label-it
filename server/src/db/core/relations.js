const knex = require('../../../knexfile');
const { Model } = require('objection');

Model.knex(knex);

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static getRelations() {
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
        relation: Model.HasManyRelation,
        join: {
          from: 'users.id',
          to: 'pins.user_id',
        },
      },
    };
  }
}

class Label extends Model {
  static get tableName() {
    return 'labels';
  }

  static getRelations() {
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
      user: {
        modelClass: User,
        relation: Model.BelongsToOneRelation,
        join: {
          from: 'labels.user_id',
          to: 'users.id',
        },
      },
    };
  }
}

class Pin extends Model {
  static get tableName() {
    return 'pins';
  }

  static getRelations() {
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
