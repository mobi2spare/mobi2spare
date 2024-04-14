export async function withTransaction(client, callback) {
    try {
      await client.query('BEGIN')
      await callback(); // Your code using database operations within the transaction
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      console.error('Error in transaction:', err);
    }
    finally{
        client.release();
    }
  }