import mongoose from 'mongoose';

export class MongoDatabaseDriver {
  /**
   *  Mongoose/MongoDB options.
   *
   * @type {import('mongoose').ConnectOptions}
   */
  #options = {
    autoIndex: true,
  };

  constructor() {
    this.#events();
  }

  #events() {
    mongoose.connection.on('error', this.#error);
    mongoose.connection.on('open', this.#open);
  }

  async connect() {
    try {
      return await mongoose.connect(process.env.DATABASE_URI, this.#options);
    } catch (error) {
      this.#error(error);
    }
  }

  #error(error) {
    console.error(error);

    process.exit(1);
  }

  #open() {
    console.log('DATABASE: OK');
  }
}
