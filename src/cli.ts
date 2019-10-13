import meow from 'meow';
import {
  DEFAULT_CLIP,
  DEFAULT_COPIES,
  DEFAULT_SIZE,
  DEFAULT_TOLERANCE,
} from './modules/node-stego/src/constant';
import {
  flags2Options as flags2OptionsStego,
  normalizeFlags as normalizeFlagsStego,
  validateFlags as validateFlagsStego,
} from './modules/node-stego/src/flag';
import { GrayscaleAlgorithm } from './modules/node-stego/src/grayscale';
import { TransformAlgorithm } from './modules/node-stego/src/transform';
import { generateSuite, validateSuite, censorSuite } from '.';
import {
  flags2Options as flags2OptionsE2E,
  normalizeFlags as normalizeFlagsE2E,
  validateFlags as validateFlagsE2E,
  ActionType,
  MediaType,
} from './flag';
import { CLI_NAME } from './constant';

const cli = meow(
  `Usage
  $ ${CLI_NAME} [options...]

Options
  -h, --help       Print help message
  -v, --version    Print version message
  -a, --action     Specify action type: 'GENERATE' (default), 'VALIDATE', 'CENSOR'.

Media Options
  -m, --media      Media tpye: FB (default), TWITTER
  -n, --name       Media account name
  -p, --pass       Media account password

Stego Options
  -t, --tolerance  Specify the number to be added into wave amplitude: ${DEFAULT_TOLERANCE} (default).
  -s, --size       Size of encoding block with radix-2 required: ${DEFAULT_SIZE} (default).
  -c, --copies     Size of duplications with odd numbers required: ${DEFAULT_COPIES} (default).
  -g, --grayscale  Specify grayscale algorithm: 'NONE' (default), 'AVG', 'LUMA', 'LUMA_II', 'DESATURATION', 'MAX_DE', 'MIN_DE', 'MID_DE', 'R', 'G', 'B'.
  -f, --transform  Specify transform algorithm: 'FFT1D' (default), 'FFT2D', 'DCT'.

Examples
  $ ${CLI_NAME} --generate
  $ ${CLI_NAME} --validate
`,
  {
    flags: {
      help: {
        type: 'boolean',
        default: false,
        alias: 'h',
      },
      version: {
        type: 'boolean',
        default: false,
        alias: 'v',
      },
      action: {
        type: 'string',
        default: ActionType.GENERATE,
        alias: 'a',
      },
      media: {
        type: 'string',
        default: MediaType.FB,
        alias: 'm',
      },
      name: {
        type: 'string',
        default: '',
        alias: 'n',
      },
      pass: {
        type: 'string',
        default: '',
        alias: 'p',
      },
      clip: {
        type: 'string',
        default: DEFAULT_CLIP,
        alias: 'i',
      },
      size: {
        type: 'string',
        default: DEFAULT_SIZE,
        alias: 's',
      },
      copies: {
        type: 'string',
        default: DEFAULT_COPIES,
        alias: 'c',
      },
      tolerance: {
        type: 'string',
        default: DEFAULT_TOLERANCE,
        alias: 't',
      },
      grayscale: {
        type: 'string',
        default: GrayscaleAlgorithm.NONE,
        alias: 'g',
      },
      transform: {
        type: 'string',
        default: TransformAlgorithm.FFT1D,
        alias: 'f',
      },
    },
    inferType: true,
  }
);

export const version = process.env.npm_package_version;

export async function run() {
  const stegoFlags = normalizeFlagsStego(cli.flags);
  const e2eFlags = normalizeFlagsE2E(cli.flags);

  if (stegoFlags.help) {
    process.stdout.write(cli.help);
    process.exit(0);
  } else if (stegoFlags.version) {
    process.stdout.write(`${version}\n`);
    process.exit(0);
  }

  const errMsg = validateFlagsStego(stegoFlags) || validateFlagsE2E(e2eFlags);

  if (errMsg) {
    process.stderr.write(`${errMsg}\n`);
    process.exit(1);
  }

  const stegoOptions = flags2OptionsStego(stegoFlags);
  const e2eOptions = flags2OptionsE2E(e2eFlags);

  if (e2eOptions.validate) {
    validateSuite();
  } else if (e2eOptions.censor) {
    censorSuite();
  } else if (e2eOptions.generate) {
    generateSuite(e2eOptions, stegoOptions);
  }
}
