const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");

// MongoDB Connection
mongoose.connect("mongodb+srv://ljremi:gGTNbMwTNEENQzdq@cluster0.6ok7t.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
});

const bookingHistorySchema = new mongoose.Schema({
    userId: Number,
    providerId: Number,
    details: String,
    date: String,
});
const BookingHistory = mongoose.model("BookingHistory", bookingHistorySchema);

const bookingSlotSchema = new mongoose.Schema({
    providerId: Number,
    slotDate: String,
    startTime: String,
    endTime: String,
    isBooked: Boolean,
});
const BookingSlot = mongoose.model("BookingSlot", bookingSlotSchema);

const expenditureSchema = new mongoose.Schema({
    userId: Number,
    amount: Number,
    date: String,
    description: String,
});
const Expenditure = mongoose.model("Expenditure", expenditureSchema);

const providerSchema = new mongoose.Schema({
    name: String,
    address: String,
    contactInfo: String,
});
const Provider = mongoose.model("Provider", providerSchema);

const userSchema = new mongoose.Schema({
    _id : String,
    name: String,
    authInfo: {
        email: String,
        passwordHash: String,
    },
    contactInfo: String,
});
const User = mongoose.model("User", userSchema);

// Define GraphQL Schema
const typeDefs = gql`
    type User {
        _id: ID!
        name: String!
        authInfo: AuthInfo!
        contactInfo: String
    }

    type AuthInfo {
        email: String
        passwordHash: String!
    }

    type Provider {
        _id: ID!
        name: String!
        address: String
        contactInfo: String
    }

    type BookingHistory {
        _id: ID!
        userId: Int!
        providerId: Int!
        details: String
        date: String
    }

    type BookingSlot {
        _id: ID!
        providerId: Int!
        slotDate: String!
        startTime: String!
        endTime: String!
        isBooked: Boolean!
    }

    type Expenditure {
        _id: ID!
        userId: Int!
        amount: Float!
        date: String!
        description: String
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
        providers: [Provider!]!
        provider(id: ID!): Provider
        bookingHistories: [BookingHistory!]!
        bookingHistory(id: ID!): BookingHistory
        bookingSlots: [BookingSlot!]!
        bookingSlot(id: ID!): BookingSlot
        expenditures: [Expenditure!]!
        expenditure(id: ID!): Expenditure
    }

    type Mutation {
        addUser(_id: ID!, name: String!, email: String!, passwordHash: String!, contactInfo: String): User!
        updateUser(id: ID!, name: String, email: String, passwordHash: String, contactInfo: String): User!
        deleteUser(id: ID!): String!
        addProvider(name: String!, address: String, contactInfo: String): Provider!
        updateProvider(id: ID!, name: String, address: String, contactInfo: String): Provider!
        deleteProvider(id: ID!): String!
        # Add mutations for booking histories, slots, and expenditures as needed
    }
`;

// Define Resolvers
const resolvers = {
    Query: {
        users: async () => await User.find(),
        user: async (_, { id }) => await User.findById(id),
        providers: async () => await Provider.find(),
        provider: async (_, { id }) => await Provider.findById(id),
        bookingHistories: async () => await BookingHistory.find(),
        bookingHistory: async (_, { id }) => await BookingHistory.findById(id),
        bookingSlots: async () => await BookingSlot.find(),
        bookingSlot: async (_, { id }) => await BookingSlot.findById(id),
        expenditures: async () => await Expenditure.find(),
        expenditure: async (_, { id }) => await Expenditure.findById(id),
    },
    Mutation: {
        addUser: async (_, { _id, name, email, passwordHash, contactInfo }) => {
            const user = new User({ _id, name, authInfo: { email, passwordHash }, contactInfo });
            return await user.save();
        },
        updateUser: async (_, { id, name, email, passwordHash, contactInfo }) => {
            return await User.findByIdAndUpdate(
                id,
                { name, authInfo: { email, passwordHash }, contactInfo },
                { new: true }
            );
        },
        deleteUser: async (_, { id }) => {
            const user = await User.findByIdAndDelete(id);
            return user ? "User deleted" : "User not found";
        },
        addProvider: async (_, { name, address, contactInfo }) => {
            const provider = new Provider({ name, address, contactInfo });
            return await provider.save();
        },
        updateProvider: async (_, { id, name, address, contactInfo }) => {
            return await Provider.findByIdAndUpdate(
                id,
                { name, address, contactInfo },
                { new: true }
            );
        },
        deleteProvider: async (_, { id }) => {
            const provider = await Provider.findByIdAndDelete(id);
            return provider ? "Provider deleted" : "Provider not found";
        },
    },
};

// Apollo Server Initialization
const server = new ApolloServer({ typeDefs, resolvers });

(async () => {
    await server.listen(3000).then(({ url }) => {
        console.log(`Server running at ${url}`);
    });
})();
