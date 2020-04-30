
exports.up = async function (knex) {
  await knex.raw(`
    CREATE OR REPLACE FUNCTION check_pin_collision()
      RETURNS trigger
      LANGUAGE 'plpgsql'
      COST 100
      VOLATILE NOT LEAKPROOF
    AS $BODY$
    BEGIN
      IF EXISTS (
        SELECT l.id, p.date, p.label_id, l.duration FROM pins p
        JOIN labels l ON p.label_id = l.id
        WHERE p.label_id = NEW.label_id
        AND (
          NEW.date BETWEEN p.date AND p.date + l.duration
          OR NEW.date + l.duration BETWEEN p.date AND p.date + l.duration
        )
      ) THEN
        RETURN NULL;
      ELSE
        RETURN NEW;
      END IF;
    END;
    $BODY$;
  `);
  await knex.raw(`
    CREATE TRIGGER on_pin_insert_check_collision
      BEFORE INSERT
      ON pins
      FOR EACH ROW
      EXECUTE PROCEDURE check_pin_collision();
  `);
};

exports.down = function () {
};
