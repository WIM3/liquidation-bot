# Liquidation Bot

- Install packages using `yarn`
- See `package.json` for all the options you can run it with

### Parameters

Some parameters can be set directly in `serverless.yml`:

- `CLEARING_HOURSE` - clearing house address (required)
- `SUBGRAPH_URL` - url of the subgraph with positions (required)

The remaining parameters are private and they are therefore taken from `AWS Parameter Store` with these paths:

```
/infinix/[ENVIRONMENT]/liquidation-bot/walletPk
/infinix/[ENVIRONMENT]/liquidation-bot/providerUrl
```
